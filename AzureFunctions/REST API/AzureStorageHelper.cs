using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using AzureFunctions;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage;
using System.Linq.Expressions;
using System;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureFunctions.RestApi
{
    public class AzureStorageHelper
    {
        CloudStorageAccount _account;
        CloudBlobClient _cloudBlobClient;

        public AzureStorageHelper(string connectionString)
        {
            _account = CloudStorageAccount.Parse(connectionString);
            _cloudBlobClient = _account.CreateCloudBlobClient();
            
        }
        private async Task<CloudBlobContainer>GetContainer(string containerName)
        {
            var container = _cloudBlobClient.GetContainerReference(containerName);
            await container.CreateIfNotExistsAsync();
            return container;
        }
        internal async Task<bool> UploadTextFile(string containerName, string fileName, string text)
        {
            var blob = (await GetContainer(containerName)).GetBlockBlobReference(fileName);
            await blob.UploadTextAsync(text);            
            return true;
        }
        internal async Task<bool> UploadBinaryFile(string containerName, string fileName, byte [] array)
        {            
            var blob = (await GetContainer(containerName)).GetBlockBlobReference(fileName);
            await blob.UploadFromByteArrayAsync(array, 0, array.Length);
            return true;
        }
        internal async Task<bool> DownloadBinaryFile(string containerName, string fileName, string outputPath)
        {
            try {
                var blob = (await GetContainer(containerName)).GetBlockBlobReference(fileName);
                var localPath = Path.Combine(outputPath, fileName);
                await blob.DownloadToFileAsync(localPath, FileMode.CreateNew);
                return true;
            }
            catch (System.Exception ex)
            {
                return false;
            }
        }
    }
}
