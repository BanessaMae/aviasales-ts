import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import type { RootState, appDispatch } from '../store/store'

export const useAppDispatch = () => useDispatch<appDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector