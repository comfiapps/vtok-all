using System;
using System.Linq;

namespace CSharpPractice
{
    public enum ExecuteFunction { qs, bfs, dfs }

    public class ExecuteFunctionMethods
    {
        public static ExecuteFunction stringToEnum(string input)
        {
            switch (input.Trim())
            {
                case "qs": return ExecuteFunction.qs;
                case "bfs": return ExecuteFunction.bfs;
                case "dfs": return ExecuteFunction.dfs;
                default: throw new Exception();
            }
        }
    }
}