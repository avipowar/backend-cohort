import ApiError from "../../../common/utils/api.error.js"
import Owner from "../models/owner.model.js"


const createOwner = async ({name , company}) => {
    const owner = await Owner.create({
        name, 
        company
    })

    return owner;
}


const getAllOwners = async () => {
    const owners = await Owner.find()

    if(!owners) {
        throw ApiError.notFound("owners not found")
    }

    return owners;
}

const getOwnerById = async (id) => {
    const owner = await Owner.findById(id);

    if(!owner) {
        throw ApiError.notFound("owner not found")
    }

    return owner
}


const updateOwner = async (id, {name, company}) => {
    const owner = await Owner.findById(id)
    
    if(!owner) {
        throw ApiError.notFound("owner not found")
    }

    const updatedOwner = await Owner.findByIdAndUpdate(id, {name, company}, {new: true, runValidators: true})

    return updatedOwner;
}

const deleteOwner = async (id) => {
    const owner = await Owner.findById(id)

    if(!owner) {
        throw ApiError.notFound("owner not found")
    }

    const deleteOwner = await Owner.findByIdAndDelete(id)

    return deleteOwner;
}

export {
    createOwner,
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner
}