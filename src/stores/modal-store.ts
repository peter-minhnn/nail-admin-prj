// import { create } from 'zustand';
// import { AuthUserType } from '@/types/user.type';
// import { AlertModalType, ModalType } from '@/types/modal.type';
// import { Locale } from '@/shared/configs/i18n/config';
// import { ActionType } from '@/types/common.type';
//
// /*
//  *  USER STORE
//  */
// type UserStore = {
//     userInfo?: AuthUserType;
//     setUserInfo: (user?: AuthUserType) => void;
// };
//
// export const useUserStore = create<UserStore>((set) => ({
//     userInfo: undefined,
//     setUserInfo: (userInfo) => set({ userInfo }),
// }));
//
// /*
//  *  MODAL STORE
//  */
// export type ModalStore = {
//     modalProps: ModalType;
//     setModalOpen: (props?: ModalType) => void;
// };
//
// export const useModalStore = create<ModalStore>((set) => ({
//     modalProps: {
//         isOpen: false,
//         isClosed: false,
//         isRefresh: true,
//         description: '',
//         customSize: '',
//         title: '',
//         modalContent: null,
//         modalFooter: null,
//         modalButton: null,
//     },
//     setModalOpen: (modalProps?: ModalType) => set({ modalProps }),
// }));
//
// /*
//  *  LOCALE STORE
//  */
// type LocaleStore = {
//     locale: Locale;
//     setLocaleStore: (locale: Locale) => void;
// };
//
// export const useLocaleStore = create<LocaleStore>((set) => ({
//     locale: 'vi',
//     setLocaleStore: (locale) => set({ locale }),
// }));
//
// /*
//  *  ALERT MODAL STORE
//  */
// export type AlertModalStore = {
//     modalProps: AlertModalType;
//     setAlertModalOpen: (props?: AlertModalType) => void;
// };
//
// export const useAlertModalStore = create<AlertModalStore>((set) => ({
//     modalProps: {
//         isOpen: false,
//         customSize: '',
//         title: '',
//         message: '',
//         btnConfirmText: '',
//         btnCancelText: '',
//         modalButton: null,
//         onConfirm: () => {},
//         onCancel: () => {},
//     },
//     setAlertModalOpen: (modalProps?: AlertModalType) => set({ modalProps }),
// }));
//
// /*
//  *  ACTIONS BUTTON STORE
//  */
// export type ActionsButtonStore<T = any> = {
//     actionType: ActionType;
//     actionData: T | any;
//     setActionType: (actionType: ActionType, actionData?: T | any) => void;
// };
//
// export const useActionsButtonStore = create<ActionsButtonStore>((set) => ({
//     actionType: '',
//     actionData: null,
//     setActionType: (actionType: ActionType, actionData?: any) =>
//         set({ actionType, actionData }),
// }));
