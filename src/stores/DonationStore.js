import { createContext } from 'react'
import { makeObservable, observable, computed, action } from 'mobx'

export const donationStore = observable({
    isUpdate: false
})

// class DonationStore {
//     // updated = false;

//     // constructor() {
//     //     makeObservable(this)
//     // }

//     updated
//     constructor(updated) {
//         makeObservable(this, {
//             updated: observable,
//             getUpdated: computed,
//             setUpdated: action
//         })
//         this.updated = updated
//     }

//   get getUpdated() {
//     return this.updated;
//   }

//   setUpdated = () => {
//     this.updated = !this.updated;
//   }
// }

// makeObservable(DonationStore, {
//     updated: observable,
//     getUpdated: computed
// })




// export default new DonationStore()
