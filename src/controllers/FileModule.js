import fs from 'fs/promises'

class Container{

    constructor(file){
        this.file = file
        this.list = async () =>{ 
            try {
                const result = await fs.readFile(this.file,{encoding:'utf8'})
                return JSON.parse(result)  
            } catch (error) { return error }

        }
    }
    
    async save(obj){
        let getList = await this.list();
        /* add id to obj and save in list products */
        getList.push(obj)
        /* get the  second last item to retrieve last id */
        let LastId = getList[ getList.length - 2 ]
        /* if LastId  exist sum id  otherwise add firt id as 1  to the obj*/
        LastId ? obj.id = LastId.id + 1 : obj.id = 1

        try {
             await fs.writeFile(this.file,JSON.stringify(getList,null,2),{encoding:'utf8'})
             return true
        } 
        catch (error) {throw error }
    }

    async getById(number){
        try {
                const result = await fs.readFile(this.file,{encoding:'utf8'})
                const products = JSON.parse(result)
                /* find product's id */
                let getPproduct = products.find(p => p.id === number );
                return getPproduct

        } catch (error) {throw error }
    }

    async getAll(){
        let products= 'pepe';
        try {
            const result = await fs.readFile(this.file,{encoding:'utf8'})
            products = JSON.parse(result)  
            return products
        } catch (error) {throw error}
    }
    async deleteById(number){
        try {
                const result = await fs.readFile(this.file,{encoding:'utf8'})
                const products = JSON.parse(result)
                /* find product's id */
                const listFiltered = products.filter(p => p.id !== number );
                await fs.writeFile(this.file,JSON.stringify(listFiltered,null,2),{encoding:'utf8'})
                return true 
        } catch (error) {throw error }
    }

    async editById(number,product){
        try {
            const result = await fs.readFile(this.file,{encoding:'utf8'})
            const products = JSON.parse(result)
            const index = products.findIndex(p => p.id === number)
            product.id = number
            products[index] = product
            await fs.writeFile(this.file,JSON.stringify(products,null,2),{encoding:'utf8'})
            return true
        } catch (error) {
            
        }
    }
    async deleteAll(){
        try {
            await fs.writeFile(this.file,JSON.stringify([],null,2),{encoding:'utf8'})
            return true 
        } catch (error) { throw error }
    }
}
export default Container