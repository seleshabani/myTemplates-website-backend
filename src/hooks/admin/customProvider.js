const { BaseProvider } = require('@admin-bro/upload')
const { promises, existsSync } = require("fs")
const { resolve, dirname } = require('path')

class MyLocalProvider extends BaseProvider {
    constructor(bucket) {
        // you have to pass bucket name to the constructor
        super(bucket)
        this.bucket = bucket
        this.path;
    }

    async upload(file,key) {
        const fullPath = resolve(this.bucket, key)
        const dirPath = dirname(fullPath)

        if (!existsSync(dirPath)) {
            await promises.mkdir(dirPath, { recursive: true })
        }
        await promises.copyFile(file.path, fullPath)
        await promises.unlink(file.path)
        console.log('uploaded')
        return key 
    }

    async delete() {
        console.log('deleted')
        return true
    }

    async path(key) {
        if(key){
            return `/public/${key}`
        }
        return '/public/uploads'

    }
}

module.exports = MyLocalProvider;