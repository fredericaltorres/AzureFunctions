using System.Collections.Generic;

namespace AzureFunctions.RestApi
{
    public interface IStore
    {
        Todo Add(Todo item);
        void Clear();
        List<Todo> GetItems();
        Todo GetItem(string id);
        Todo Remove(Todo item);
    }
}