# ------------------------------------------------------------------------------------------
# 
# PowerShell unit tests for REST API written with Azure Function
#
# ------------------------------------------------------------------------------------------
Import-Module ".\curl.psm1" -Force
Import-Module ".\assert.psm1" -Force

function createNewItem($url) {

    $desc   = "Hello $([System.Environment]::TickCount)"
    $json   = '{TaskDescription:"' + $desc + '"}'
    $result = apiPost $url $json   
    Write-Host "New item created $($result.id)" 
    return $result
}

function AssertItem($item, $result) {

    Assert-AreEqual $item.id $result.id "Verify array length" | Out-Null
    Assert-AreEqual $item.TaskDescription $result.TaskDescription "Verify array length" | Out-Null
    Assert-AreEqual $item.IsCompleted $result.IsCompleted "Verify array length" | Out-Null
}

cls
Assert-Verbose $true

$BaseUrl = "http://localhost:7071/api"
$BaseUrl = "http://azurefunctionsfred.azurewebsites.net/api"

$url     = "$BaseUrl/test/reset"
Assert-AreEqual $true (apiGet $url) | Out-Null

$url = "$BaseUrl/todo"
$result = apiGet $url
Assert-AreEqual 0 $result.Length | Out-Null

# Create Item
$item1 = createNewItem $url
$result = apiGet $url
Assert-AreEqual 1 $result.Length "Verify array length" | Out-Null
Assert-AreEqual $item1.TaskDescription $result[0].TaskDescription | Out-Null

$item2 = createNewItem $url
$result = apiGet $url
Assert-AreEqual 2 $result.Length "Verify array length" | Out-Null
Assert-AreEqual $item2.TaskDescription $result[1].TaskDescription | Out-Null

# GetItemById
$result = apiGet "$url/$($item2.id)"


AssertItem $item2 $result

# UpdateItem
$item2.IsCompleted = $true
$item2.TaskDescription += "@"
$result = apiPut "$url/$($item2.id)" (ConvertTo-Json $item2)

$result = apiGet "$url/$($item2.id)"
AssertItem $item2 $result