using System;
using System.Threading.Tasks;
using Statiq.App;
using Statiq.Web;

namespace heebinho.github.io
{
    class Program
    {
        public static async Task<int> Main(string[] args){
            var task = await Bootstrapper
                .Factory
                .CreateWeb(args)
                .RunAsync();
            return task;
        }
        
    }
}
