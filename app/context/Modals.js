import React, { createContext, useContext, useState, useMemo } from 'react'

const ModalContext = createContext([])

const ModalsProvider = ({ children }) => {
  const [modals, setModals] = useState({})

  const modalIsShown = (name) => {
    return modals[name]
  }

  const showModal = (name) => {
    setModals((prev) => ({ ...prev, [name]: true }))
  }

  const hideModal = (name) => {
    setModals((prev) => ({ ...prev, [name]: false }))
  }

  const hideAllModals = () => {
    setModals({})
  }

  const values = useMemo(
    () => ({
      modals,
      modalIsShown,
      showModal,
      hideModal,
      hideAllModals
    }),
    [modals]
  )

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  )
}

const useModals = () => {
  const context = useContext(ModalContext)
  return context
}

export { useModals, ModalsProvider }
