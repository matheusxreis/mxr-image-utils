## mxr-image-utils

A image utils library.

The idea is that it be a image-utils library with a lot of functions for a lot of situations. For a while, it has just a base64's module.

Below is how to use the library main functions:

#### How to use:

```js

import { ImageUtils } from "mxr-image-utils/base64";

async function convertImage(e){
    await ImageUtils.blobToBase64({blob: e.target.files[0]}); // convert a blob object to a base64 string
}

/**
 * return: 
     { 
     * base64:"iVBORw0KGgoAAAANSUhEUgAAAe...", 
     * completeBase64: "data:image/png;base64,iVBO...",
     * fileType: "png"
     * }
     */

async function convertUrlImage(url){
    await ImageUtils.urlToBase64(url) //convert a url to a base64 string;

    // this function return the same instance of object that the blobToBase64 function
}
```

There is anothers functions, which can be utils:

```js 

    ImageUtils.isImage(base64) /// verify if a base64 is from a image
    ImageUtils.isBlob(blob) //verify is the param is really a blob

    //both return a boolean
```


:metal: