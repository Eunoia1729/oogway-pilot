import { atom } from 'recoil'
import { compareFormOptions } from '../utils/types/global'

export const comparePostType = atom<compareFormOptions>({
    key: 'comparePostTypeState',
    default: 'chooseType',
})

export const textCompareLeft = atom<string>({
    key: 'textToCompareLeftState',
    default: '',
})

export const textCompareRight = atom<string>({
    key: 'textToCompareRightState',
    default: '',
})

export const imageCompareLeft = atom<string | ArrayBuffer | null | undefined>({
    key: 'imageToCompareLeftState',
    default: null,
})

export const imageCompareRight = atom<string | ArrayBuffer | null | undefined>({
    key: 'imageToCompareRightState',
    default: null,
})

export const hasPreviewedCompare = atom<boolean>({
    key: 'hasPreviewedCompareState',
    default: false,
})

export const leftPreviewImage = atom<string>({
    key: 'leftPreviewImageState',
    default: '',
})

export const rightPreviewImage = atom<string>({
    key: 'rightPreviewImageState',
    default: '',
})
