class ApiResponse {
    static ok(res, message, data=null){
        res.status(200).json({
            success: true,
            message,
            data
        })
    }

    static created(res, message, data=null){
        return res.status(201).json({
            success: true,
            message,
            data
        })
    }

    static noContenet(res){
        return res.status(204).send()
    }
}

// ApiResponse.ok(res, "i am avinash");

export default ApiResponse;