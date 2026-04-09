import Joi from "joi";

class BaseDto {
    static schema = Joi.object({})

    static validate(data){
        const {error , value}= this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        })

        if(error){
            const errors = error.details.map((d) => d.message)
            return {error, value: null}
        }
        return {value, error: null}

    }   
}

// BaseDto.validate() // using static 


export default BaseDto;















// import Joi from "joi"

// // Step 1: Schema बनाओ
// const userSchema = Joi.object({
//     name:  Joi.string().min(3).required(),
//     email: Joi.string().email().required(),
//     age:   Joi.number().min(18).required()
// })

// // Step 2: Validate करो
// const { error, value } = userSchema.validate(
//     {
//         name: "Rahul",
//         email: "rahul@gmail.com",
//         age: 20,
//         randomField: "hello"   // यह strip हो जाएगा
//     },
//     {
//         abortEarly: false,
//         stripUnknown: true
//     }
// )

// // Step 3: Result check करो
// if (error) {
//     console.log("❌ Errors:", error.details.map(d => d.message))
// } else {
//     console.log("✅ Clean data:", value)
//     // { name: "Rahul", email: "rahul@gmail.com", age: 20 }
//     // randomField गायब हो गया!
// }