import api from "../api/api";
import router from "../router";

export default {
    state: {
        activeLoan: null,
        archiveLoan: null,
        paymentMethodList: [{id: 1, value: 'Карта'}, {id: 2, value: 'Банковский перевод'}],
        contract: null,
        requestPayment: null,
        debt: null,
        language: localStorage.getItem('selectedLang') || null,
        userCards: null
    },
    mutations: {
        SET_LOAN(state, payload) {
            if (payload === null) {
                state.activeLoan = null
                state.archiveLoan = null
            } else {
                state.activeLoan = payload.filter(loan => loan.active === true)
                state.archiveLoan = payload.filter(loan => loan.active === false)
            }

        },
        SET_CONTRACT(state, payload) {
            state.contract = payload
        },
        SET_REQUEST_PAYMENT(state, payload) {
            state.requestPayment = payload
        },
        SET_DEBT(state, payload) {
            state.debt = payload
        },
        SET_LANGUAGE(state, payload) {
            state.language = payload
        },
        SET_USER_CARDS(state, payload) {
            state.userCards = payload
        }
    },
    actions: {
        /**
         * Получить карты пользователя
         * @param commit
         * @returns {Promise<void>}
         */
        async getUserCards({commit}) {
            const {data} = await api.getUserCards()
            commit('SET_USER_CARDS', data)
        },

        /**
         * Активировать карту
         * @param dispatch
         * @param id
         * @returns {Promise<void>}
         */
        async setActiveUserCard({commit, dispatch}, id) {
            commit('clearError')
            try {
                await api.setActiveUserCard(id)
                dispatch('getUserCards')
                commit('setSuccess', 'Выбрана активная карта')
            } catch (error) {
                commit('setError', 'Ошибка')
            }
        },

        /**
         * Добавить карту
         * @param commit
         * @param dispatch
         * @param payload
         * @returns {Promise<void>}
         */
        async addCard({commit, dispatch}, payload) {
            commit('clearError')
            try {
                await api.addCard(payload)
                dispatch('getUserCards')
                commit('setSuccess', 'Успешно')
            } catch (error) {
                commit('setError', 'Ошибка')
            }
        },

        /**
         * Удаление карты пользователя
         * @param commit
         * @param dispatch
         * @param payload
         * @returns {Promise<void>}
         */
        async removeCard({commit, dispatch}, payload) {
            commit('clearError')
            try {
                await api.removeCard(payload)
                dispatch('getUserCards')
                commit('setSuccess', 'Успешно')
            } catch (error) {
                commit('setError', 'Ошибка')
            }
        },

        /**
         * Смена языка
         * @param commit
         * @return {Promise<void>}
         */
        async localChanger({commit}, payload) {
            commit('SET_LANGUAGE', payload)
        },

        /**
         * Получить все займы пользователя
         * @param commit
         * @return {Promise<void>}
         */
        async getLoanList({commit, dispatch}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const response = await api.getLoanList()
                if (response.data.data.length) {
                    commit('SET_LOAN', response.data.data)
                }
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                // commit('setError', 'Займы не доступны')
                dispatch('logOut')
                router.push('/login')
                throw error
            }
        },
        /**
         * Отправить заявку на займ
         * @param commit
         * @param payload
         */
        async sendLoanRequest({commit}, payload) {
            try {
                await api.sendLoanRequest(payload)
            } catch (e) {
                console.log(e)
            }
        },
        /**
         * Получить договор на подписания
         * @param commit
         * @return {Promise<void>}
         */
        async getContract({commit, dispatch}, payload) {
            try {
                const response = await api.getContract(payload)
                commit('SET_CONTRACT', response.data.data.contract_file)
            } catch (error) {
                commit('setError', 'Ошибка загрузки договора')
                // dispatch('logOut')
                // router.push('/login')
                // console.log(error.response.data.error)
            }
        },
        /**
         * Запрос на отправку SMS на серевере
         * @param commit
         * @param payload
         * @return {Promise<void>}
         */
        async requestSmsForContract({commit, dispatch}, payload) {
            try {
                return await api.requestSmsForContract(payload)
            } catch (error) {
                // console.log(error.response.data.error)
                commit('setError', "Ошибка СМС центра попробуйте через 3 минуты")
            }
        },
        /**
         * Подтвердить договор по SMS
         * @param commit
         * @param payload
         * @return {Promise<void>}
         */
        async confirmContractBySMS({commit}, payload) {
            commit('clearError')
            try {
                const response = await api.confirmContractBySMS(payload)
                commit('setSuccess', 'Успешно')
            } catch (error) {
                commit('setError', 'Ошибка')
            }
        },
        /**
         * Выбор методы выплоты
         * @param commit
         * @param payload
         * @return {Promise<void>}
         */
        async setPayment({commit}, payload) {
            commit('clearError')
            try {
                await api.setPayment(payload)
                commit('setSuccess', 'Успешно')
            } catch (error) {
                commit('setError', 'Ошибка')
            }
        },
        /**
         * Запрос на выплоту
         * @param commit
         * @param payload
         * @return {Promise<void>}
         */
        async requestPayment({commit}, payload) {
            commit('clearError')
            try {
                const response = await api.requestPayment(payload)
                commit('SET_REQUEST_PAYMENT', response.data.data)
                // commit('setSuccess', 'Успешно')
            } catch (error) {
                commit('setError', 'Ошибка')
            }
        },
        /**
         * Выплота долга
         * @param commit
         * @param payload
         * @return {Promise<void>}
         */
        async rePayment({commit}, payload) {
            commit('clearError')
            try {
                const response = await api.rePayment(payload)
                commit('setSuccess', 'Переход на строницу оплаты')
                if (response.data.data.pay_link) {
                    document.location.assign(response.data.data.pay_link.toString())
                }
            } catch (error) {
                commit('setError', 'Ошибка')
            }
        },
        /**
         * Остаток по текущему займу
         * @param commit
         * @param payload
         * @return {Promise<void>}
         */
        async debt({commit}, payload) {
            try {
                const response = await api.debt(payload)
                commit('SET_DEBT', response.data.data)
            } catch (e) {
                commit('setError', 'Ошибка в запросе о задолжности')
            }
        }
    },
    getters: {
        getActiveLoan: state => state.activeLoan,
        getArchiveLoan: state => state.archiveLoan,
        paymentMethodList: state => state.paymentMethodList,
        getContract: state => state.contract ?? false,
        getRequestPayment: state => state.requestPayment ?? false,
        getDebt: state => state.debt ?? false,
        getLanguage: state => state.language,
        userCards: state => state.userCards
    }
}
