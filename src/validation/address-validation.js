import Joi from "joi"

const createAddressValidaton = Joi.object({
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  province: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.string().max(10).optional(),
})
const updateAddressValidaton = Joi.object({
  id: Joi.number().positive().min(1).required(),
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  province: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.string().max(10).optional(),
})
const getAddressValidation = Joi.number().min(1).positive().required()
const removeAddressValidation = Joi.number().min(1).positive().required()
export {
  createAddressValidaton,
  getAddressValidation,
  updateAddressValidaton,
  removeAddressValidation,
}
