Title: A functional approach to the using statement in C#
Published: 7/15/2020
Tags: [C#, fp]
Lead: Using HOF's to encapsulate setup and teardown
---

### Intro
Lately I participated in a job interview and was questioned about the C# 8 "using declaration":

``` csharp
string lines=@"This is line one
This is line two";

using var reader = new StringReader(lines);
string? item;
do {
    item = reader.ReadLine();
    Console.WriteLine(item);
} while(item != null);
```
I'm pretty familiar with the "using statement" and the underlying concept, but didn't know about the new "using declaration" which was introduced in C# 8 and failed to answer the question, whether a given code snippet will compile or not. When you're not familiar with the new approach, you'll miss the braces and you'll think the Roslyn compiler will fail.

While I was reading a few articles about the motivation, the scope and the pro and cons of the using declaration I realized that nobody mentioned alternative approaches to the underlying challenge - to encapsulate setup and teardown operations.

Interestingly enough I'm currently reading ["Functional Programming in C#"](https://www.manning.com/books/functional-programming-in-c-sharp) and the author Enrico Buonanno shows in an inspiring way, how to encapsulate setup and teardown operations into a HOF (Higher Order Function) to avoid code duplication. 

In the following blog post I'll discuss some aspects of the using keyword and introduce "A functional approach to the using statement in C#".

If you're up to more than an introduction, I totally recommend the aforementioned book Functional Programming in C#.

<a href="https://www.manning.com/books/functional-programming-in-c-sharp" target="_blank" style="border:0;"><img src="data:image/png;base64,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"></a>

You can find the repository with the following illustrations on GitHub: [https://github.com/heebinho/fp-using](https://github.com/heebinho/fp-using)

### First off, using vs using
C# has different meanings for the using keyword, which in my opinion isn't ideal but not to bad either, because the meaning is pretty obvious in relation to it's context.

using directive:
```csharp
using System;
```
using alias directive:
```csharp
using Excel = Microsoft.Office.Interop.Excel;
```
using static directive:
```csharp
using static System.Math;

public double Circumference
    => PI * 2 * Radius
```
using static enables unqualified access to the static members and was introduced in C# 6 to improve readability.  
(PI in the above example)

As mentioned in the introduction C# 8 introduced the using declaration which is related to the following using statement:

```csharp
string manyLines=@"This is line one
This is line two";

using (var reader = new StringReader(manyLines))
{
    string? item;
    do {
        item = reader.ReadLine();
        Console.WriteLine(item);
    } while(item != null);
}
```
Pretty similar to the using declaration showed in the beginning. The using declaration just doesn't require the braces. So I guess many developers will prefer the new using declaration to improve readability. But what happens under the hood ...

### Disposing Resources with the traditional using statement

The primary use of the IDisposable interface is to release unmanaged resources. You can use the using statement instead of explicitly calling Dispose() yourself as illustrated in the following example:

```csharp
using System;
using Xunit;

public class DisposableResource : IDisposable
{
    private bool disposed = false;

    public void Dispose()
    {
        Console.WriteLine($"Dispose {T}");
        disposed = true;
    }
    public void Do() => TryWrite();

    void TryWrite()
    {
        if (disposed) throw new ObjectDisposedException("object disposed.");
        Console.WriteLine($"Write: {T}");
    }

    public int T => DateTime.Now.Millisecond;
}

public class DisposableResourceTest
{
    [Fact]
    public void ShouldDisposeRessource()
    {
        var resource = new DisposableResource();
        Action a = () => resource.Do();
        using (resource){ a(); }
        Assert.Throws<ObjectDisposedException>(a);
    }
}
```

```bash
$ dotnet test --filter "DisposableResourceTest"
-->
A total of 1 test files matched the specified pattern.
Write: 637291702458775586
Dispose: 637291702458872992

Test Run Successful.
Total tests: 1
     Passed: 1
```

If you look at the output, you can see that the Dispose() method was called. The compiler wraps the operations of the using block in a try/finally block.
You can verify it, if you look at the generated IL code:

```csharp
.try
  {
    //e.g
    IL_0019:  leave.s    IL_0026
  }  // end .try
  finally
  {
    IL_001b:  ldloc.0
    IL_001c:  brfalse.s  IL_0025
    IL_001e:  ldloc.0
    IL_001f:  callvirt   instance void [mscorlib]System.IDisposable::Dispose()
    IL_0024:  nop
    IL_0025:  endfinally
  }  // end handler
```

You can see the try/finally block and the call of the Dispose() method.
<!-- 
### Scope

With the using declaration, you don't introduce an extra block of nested code. Instead, you declare the instance as you would any other, preceding it with the using keyword:

```csharp
using var reader = new StringReader("using");
```

This raises the question, when will the Dispose() method be called? -->


### Functional approach

When we use the using statement or the using declaration we don't need to wrap our code into a try/finally block and we don't need to call the Dispose() method ourselves. In essence there are three steps which are executed in the following order:

1. Acquiring a resource implementing IDisposable
2. Execute operations in scope {}
3. Dispose resource

Whereas the first and the last step are always identical i.e. boilerplate. We can raise the abstraction level and use a function f() to represent the required operations and the terms setup/teardown to contrive a common use case for a HOF:

1. Setup
2.   f()
3. Teardown


C# supports functions as first-class values, which means that we can write a function f() that takes an IDisposable and a function g() as arguments:

> g: IDisposable -> R  
> f: (IDisposable, g()) -> R  
> f: (IDisposable, (IDisposable -> R)) -> R

A possible implementation could look like this:

```csharp
public static R Using<TDisp, R>(TDisp disposable
    , Func<TDisp, R> func) where TDisp : IDisposable
{
    using (var disp = disposable) return func(disp);
}
```

Or now, that we know that the compiler will call the Dispose() method in the finally block, we could remove the using keyword entirely:

```csharp
public static R Using<TDisp, R>(TDisp disposable
    , Func<TDisp, R> func) where TDisp : IDisposable
{
        try
        {
            return func(disposable);
        }
        finally
        {
            disposable?.Dispose();
        }
}
```

This generic Using method takes two arguments - a disposable resource, and a function to be executed before the resource is disposed.
Now we have everything in place to take advantage of the Using HOF:

```csharp
public class DisposableResourceTest
{
    [Fact]
    public void ShouldDisposeRessourceFP()
    {
        var resource = new DisposableResource();
        Action<DisposableResource> a = (r) => resource.Do();

        //An extension method which turns an Action<T> into a Func<T, R>
        Func<DisposableResource, Unit> f = a.ToFunc(); 

        //Now we can use our Using method as intended
        Using(resource, f); 

        //The resource is disposed and should throw an ObjectDisposedException
        Assert.Throws<ObjectDisposedException>(()=>resource.Do());
    }
}
```
In the above example you can see, that it is pretty straightforward to leverage the custom Using function. One side note: The Using function expects a function as the second argument and not an action, this is why we have to transform the Action\<T\> into a Function<T, Unit> with the help of the ToFunc() extension method:


```csharp
using System;
using Unit = System.ValueTuple;
using static F;

public partial static class F{
    public static Unit Unit() => default(Unit);
}

public static class ActionExtensions{
    public static Func<Unit> ToFunc(this Action action)
        => () => { action(); return Unit(); };
    
    public static Func<T, Unit> ToFunc<T>(this Action<T> action)
        => (t) => { action(t); return Unit(); };
}
```
The Unit() method returns a System.ValueTuple and means "no return value".

### Closing thoughts

Although it feels a bit radical it's definitely an elegant solution to a recurring problem and has some advantages:

* No code duplication
* Separation of concerns
* Conciseness

There are also some downsides:

* It feels more complex, especially if you're not used to fp
* Increased stack use

For me there's conceptually much more to learn in the fp world and presumably I'll write about some topics in the future.