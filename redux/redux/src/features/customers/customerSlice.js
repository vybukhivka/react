const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: ''
}

export default function customerReducer(state = initialStateCustomer, action) {
  switch(action.type) {
    case 'customer/createCustomer':
    return {
      ...state,
      fullName: action.payload.fullName,
      nationalID: action.payload.nationalID,
      createAt: action.payload.createAt
    }
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload
      }
    default: 
      return {
        ...state
      }
  }
}

export function createCustomer(fullName, nationalID) {
  return { type: 'customer/createCustomer', payload: {
    fullName,
    nationalID,
    createdAt: new Date().toISOString() 
  }}
}

export function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName}
}
