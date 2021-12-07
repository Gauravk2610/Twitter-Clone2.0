import { atom } from 'recoil'

const loadingState = atom({
    key: 'loadingState',
    default: true
})

export { loadingState }