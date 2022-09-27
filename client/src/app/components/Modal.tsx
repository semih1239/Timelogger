import React, { ReactElement } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Modal {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    modalBody: ReactElement;
    onConfirm?: () => void;
}

export default function Modal(props: Modal) {
    const { open, setOpen, title, modalBody, onConfirm } = props;
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                {title}
                                            </Dialog.Title>
                                            {modalBody}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {onConfirm && <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={onConfirm}
                                    >
                                        Confirm
                                    </button>}
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}














// import React from 'react';
// import ReactModal from 'react-modal';

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//     },
// };

// // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// ReactModal.setAppElement('#root');

// export default function TimeModal() {
//     let subtitle: any;
//     const [modalIsOpen, setIsOpen] = React.useState(false);

//     function openModal() {
//         setIsOpen(true);
//     }

//     function afterOpenModal() {
//         // references are now sync'd and can be accessed.
//         subtitle.style.color = '#f00';
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }

//     return (
//         <div>
//             <button onClick={openModal}>Open Modal</button>
//             <ReactModal
//                 isOpen={modalIsOpen}
//                 onAfterOpen={afterOpenModal}
//                 onRequestClose={closeModal}
//                 style={customStyles}
//                 contentLabel="Example Modal"
//             >
//                 <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
//                 <button onClick={closeModal}>close</button>
//                 <div>I am a modal</div>
//                 <form>
//                     <input />
//                     <button>tab navigation</button>
//                     <button>stays</button>
//                     <button>inside</button>
//                     <button>the modal</button>
//                 </form>
//             </ReactModal>
//         </div>
//     );
// }


// import React, { useState } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// const TimeModal = (props: any) => {
//     const [state, setState] = useState<any>({
//         modal: true,
//         nestedModal: false,
//         closeAll: false
//     })

//     const toggle = () => {
//         setState({ modal: !state.modal });
//     }

//     const toggleNested = () => {
//         setState({
//             nestedModal: !state.nestedModal,
//             closeAll: false
//         });
//     }

//     const toggleAll = () => {
//         setState({
//             nestedModal: !state.nestedModal,
//             closeAll: true
//         });
//     }

//     return (
//         <div>
//             <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
//             <Modal isOpen={state.modal} toggle={toggle} className={className}>
//                 <ModalHeader toggle={toggle}>Modal title</ModalHeader>
//                 <ModalBody>
//                     Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//                     <br />
//                     <Button color="success" onClick={toggleNested}>Show Nested Modal</Button>
//                     <Modal isOpen={state.nestedModal} toggle={toggleNested} onClosed={state.closeAll ? toggle : undefined}>
//                         <ModalHeader>Nested Modal title</ModalHeader>
//                         <ModalBody>Stuff and things</ModalBody>
//                         <ModalFooter>
//                             <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
//                             <Button color="secondary" onClick={toggleAll}>All Done</Button>
//                         </ModalFooter>
//                     </Modal>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
//                     <Button color="secondary" onClick={toggle}>Cancel</Button>
//                 </ModalFooter>
//             </Modal>
//         </div>
//     );

// }

// export default TimeModal;