#tool nuget:?package=Wyam&version=2.2.4
#tool "nuget:?package=GitVersion.CommandLine&version=4.0.0"
#addin nuget:?package=Cake.Wyam&version=2.2.4
#addin nuget:?package=Cake.Git&version=0.19.0

var target = Argument("target", "Default");

var repositoryUrl = "https://github.com/heebinho/heebinho.github.io.git";
var githubUserName = EnvironmentVariable("GITHUB_USERNAME");
var githubAccessToken = EnvironmentVariable("GITHUB_ACCESS_TOKEN");

var gitVersion = GitVersion();

var tempDir =  GetTempDirectory();

public string GetTempDirectory() {
    string path = System.IO.Path.GetRandomFileName();
    return System.IO.Directory.CreateDirectory(System.IO.Path.Combine(System.IO.Path.GetTempPath(), path)).FullName;
}

Task("Default")
    .Does(() => {
    });

Task("Build")
    .Does(() =>
    {
        Wyam();
    });

Task("Preview")
    .Does(() =>
    {
        Wyam(new WyamSettings
        {
            Preview = true,
            Watch = true
        });
    });

Task("Deploy")
    .IsDependentOn("PushMasterBranch");

Task("CloneMasterBranch")
    .Does(() => {
        Information("Cloning master branch into temp directory");
        Information("repo: " + repositoryUrl);


        GitClone(
            repositoryUrl,
            new DirectoryPath(tempDir),
            githubUserName,
            githubAccessToken,
            new GitCloneSettings {
                BranchName = "master"
            }
        );
    });

Task("EmptyMasterBranch")
    .IsDependentOn("CloneMasterBranch")
    .Does(() => {
        Information("Emptying master branch");

        string[] filePaths = System.IO.Directory.GetFiles(tempDir);
        //keep the following files
        var files = new List<string>(){"cname","pgp.asc",".nojekyll",".gitattributes, 404.html"};
        var directories = new List<string>(){".git","cv"};


        foreach (string filePath in filePaths)
        {
            var fileName = new FileInfo(filePath).Name;
            fileName = fileName.ToLower();

            if(files.Contains(fileName)){continue;}

            if(System.IO.File.Exists(filePath))
            {
                DeleteFile(filePath);
            }
        }

        string[] directoryPaths = System.IO.Directory.GetDirectories(tempDir);

        foreach (string directoryPath in directoryPaths)
        {
            var directoryName = new FileInfo(directoryPath).Name;
            directoryName = directoryName.ToLower();

            if(directories.Contains(directoryName) )
            {
                // Do not delete the .git/cv directories
                continue;
            }

            if (System.IO.Directory.Exists(directoryPath))
            {
                DeleteDirectory(
                    directoryPath,
                    new DeleteDirectorySettings{
                        Recursive = true,
                        Force = true
                });
            }
        }
    });

Task("CopyToMasterBranch")
    .IsDependentOn("Build")
    .IsDependentOn("EmptyMasterBranch")
    .Does(() => {
        var sourcePath = "./output";
        Information("Copying output files to master branch");
        Mirror.it(sourcePath, tempDir);

        var profilePath = "./profile";
        Information("Copying profile files to master branch");
        Mirror.it(profilePath, tempDir);
    });

public static class Mirror{
    public static void it(string sourcePath, string tempDir){
        // Now Create all of the directories
        foreach (string dirPath in System.IO.Directory.GetDirectories(sourcePath, "*", SearchOption.AllDirectories))
        {
            System.IO.Directory.CreateDirectory(dirPath.Replace(sourcePath, tempDir));
        } 

        //Copy all the files & Replaces any files with the same name
        foreach (string newPath in System.IO.Directory.GetFiles(sourcePath, "*.*", SearchOption.AllDirectories))
            System.IO.File.Copy(newPath, newPath.Replace(sourcePath, tempDir), true);
    }
}    

Task("CommitMasterBranch")
    .IsDependentOn("CopyToMasterBranch")
    .Does(() => {
        Information("Performing Git commit on master branch");

        GitAddAll(tempDir);
        GitCommit(tempDir, "heebinho", "renatoheeb@gmail.com", $"Automated release {gitVersion.InformationalVersion}");
    });

Task("PushMasterBranch")
    .IsDependentOn("CommitMasterBranch")
    .Does(() => {
        Information("Pushing master branch to origin");

        GitPush(tempDir, githubUserName, githubAccessToken, "master");
    });

RunTarget(target)