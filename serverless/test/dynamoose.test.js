import '@babel/polyfill'
import dynamoose from "dynamoose"
import dynalite from "dynalite"

describe('Dynamoose Test', function () {
    it('Dynamoose Local Test', async function () {
        const dynaliteServer = dynalite();
        await dynaliteServer.listen(8000);

        dynamoose.AWS.config.update({
            accessKeyId: 'AKID',
            secretAccessKey: 'SECRET',
            region: 'us-east-1'
        });
        dynamoose.local(); // This defaults to "http://localhost:8000"

        const Cat = await dynamoose.model('Cat', { id: Number, name: String });

        const garfield = new Cat({ id: 666, name: 'Garfield' });
        await garfield.save();
        const badCat = await Cat.get(666);
        console.log('Never trust a smiling cat. - ' + badCat.name);
        dynaliteServer.close();
    });
});