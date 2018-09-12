# ------------------------------------------------------------------------------------------
# 
# PowerShell unit tests for REST API written with Azure Function
#
# ------------------------------------------------------------------------------------------
Import-Module ".\curl.psm1" -Force
Import-Module ".\assert.psm1" -Force

function createNewItem($url, $wait = $false) {

    $desc   = "Hello $([System.Environment]::TickCount)"
    $json   = '{TaskDescription:"' + $desc + '"}'

    # post item to queue
    $queuedItem = apiPost ($url+"_queue") $json
    Write-Host "$queuedItem id $($queuedItem.id)"

    $item = apiPost $url $json
    Write-Host "New item created $($item.id)"
    return $item
}

function AssertItem($item, $result) {

    Assert-AreEqual $item.id $result.id "Verify array length" | Out-Null
    Assert-AreEqual $item.TaskDescription $result.TaskDescription "Verify array length" | Out-Null
    Assert-AreEqual $item.IsCompleted $result.IsCompleted "Verify array length" | Out-Null
}

cls
$AZURE_MODE = $false
# $AZURE_MODE = $true

Assert-Verbose $true

$BaseUrl = "http://localhost:7071/api"
if($AZURE_MODE) {
    $BaseUrl = "http://azurefunctionsfred.azurewebsites.net/api"
}


$url     = "$BaseUrl/test/reset"
Assert-IsTrue (apiGet $url) | Out-Null

$url = "$BaseUrl/todo"
$result = apiGet $url
Assert-AreEqual 0 $result.Length | Out-Null

# Create Item
$item1 = createNewItem $url $true
$result = apiGet $url
Assert-AreEqual 1 $result.Length "Verify array length" | Out-Null
Assert-AreEqual $item1.TaskDescription $result[0].TaskDescription | Out-Null

$item2 = createNewItem $url $true
$result = apiGet $url
Assert-AreEqual 2 $result.Length "Verify array length" | Out-Null
### Assert-AreEqual $item2.TaskDescription $result[1].TaskDescription | Out-Null
# In Azure table the rows are in random order try row 0 or 1
Assert-IsTrue (($item2.TaskDescription -eq $result[0].TaskDescription) -or ($item2.TaskDescription -eq $result[1].TaskDescription)) | Out-Null

# GetItemById
$result = apiGet "$url/$($item2.id)"
AssertItem $item2 $result

# UpdateItem
$item2.IsCompleted = $true
$item2.TaskDescription += "@"
$result = apiPut "$url/$($item2.id)" (ConvertTo-Json $item2)

$result = apiGet "$url/$($item2.id)"
AssertItem $item2 $result

# DeleteItem
$result = apiDelete "$url/$($item2.id)"
$result = apiGet $url
Assert-IsTrue $result | Out-Null
Assert-AreEqual 1 $result.Length "Verify array length" | Out-Null

$result = apiDelete "$url/$($item1.id)"
$result = apiGet $url
Assert-AreEqual 0 $result.Length "Verify array length" | Out-Null
