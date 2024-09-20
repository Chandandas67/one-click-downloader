document.querySelector("#downloadimage").addEventListener("click",function(){
    let zip = new JSZip();

    let imageUrls =[
        'https://images.unsplash.com/photo-1682685797769-481b48222adf?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://media.istockphoto.com/id/1396781717/photo/delivery-van-driving-on-a-dirt-road-at-night-in-moab-utah-usa.jpg?s=1024x1024&w=is&k=20&c=Q7pdRR-a7rmD_N66yjnSTdD6LzoItXXvi21z_PetSdQ=',
    ];
    function addImagesToZip(Urls,Zip){
        let promises = urls.map((url,index)=>{
          return fetch(url).then((response)=>{
             return response.blob();
          }).then((blob)=>{
            zip.file("image_"+index+".png",blob);
          })
        });

        return promise.all(promises);
    };

    addImagesToZip(imageUrls,zip).then(()=>{
        zip.generateAsync({type : "blob"}).then((content)=>{
             var zipBlob = new Blob([content]);
             var zipUrl = window.URL.createObjectURL(zipBlob);

             var a = document.createElement("a");
             a.href = zipUrl;
             a.download = "blobImages.zip";
             document.body.appendChild(a);

             a.click();
            window.URL.revokeObjectURL(zipUrl);
            document.body.removeChild(a);
        })
    })
})