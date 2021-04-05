const uploadFeature = require('@admin-bro/upload')
const { item } = require('../../model/item');
const path = require('path');
const fs = require('fs')
const MyLocalProvider = require('./customProvider');

const itemOptions = {
    resource: item,
    features: [uploadFeature({
        provider: new MyLocalProvider(path.join(__dirname,'../../../public')),
        properties: {
            mimeType: ['image/jpeg', 'image/png'],
            key: 'screen',
            bucket: 'screenBucket',
            // file: 'screenFile',
            // filePath: 'screenPath'
        },
        uploadPath: (record, filename) => (
            `uploads/${filename}`
        )
    })],
    options: {
        properties: {
            screenPath: {
                isVisible: false
            },
            screen: {
                isVisible: false
            },
            screenBucket: {
                isVisible: false
            },
            createdAt: {
                isVisible: false
            }
        }
    }
}
module.exports = itemOptions