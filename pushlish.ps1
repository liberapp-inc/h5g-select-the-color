Param($name)

egret publish --version $name

$Src1 = ".\bin-release\web\"+ $name+ "\*"
$src2 = ".\bin-release\web\assets\*"
$Dst  = ".\bin-release\web\" + $name + ".zip"

Compress-Archive -Force -Path $Src1,$Src2 -DestinationPath $Dst
