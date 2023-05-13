import { reactive } from 'vue'
import { StoreMap } from './StoreMap'
import { defineStore } from './functions'

export function defineItemStore<Item extends { id: number }>(
	namespace: string,
) {
	return defineStore(namespace, ({ api }) => {
		const items = reactive(new StoreMap<number, Item>())

		async function list(params?: Record<string, any>) {
			const { data } = await api.get<Item[]>(`/${namespace}`, { params })
			return data.map(item => items.set(item.id, item))
		}

		function fetch(id: number) {
			return new Promise<Item>((resolve, reject) => {
				// quick resolve if item is already in store.
				// Store item is reactive and will get updated after fetch
				if (items.has(id)) resolve(items.get(id)!)

				return api.get<Item>(`/${namespace}/${id}`).then(({ data }) => {
					const item = items.set(data.id, data)
					return resolve(item)
				}, reject)
			})
		}

		async function create(data: Partial<Item>): Promise<Item> {
			const { data: item } = await api.post<Item>(`/${namespace}`, data)
			return items.set(item.id, item)
		}

		async function update(data: Partial<Item>) {
			const url = `/${namespace}/${data.id}`
			const { data: item } = await api.patch<Item>(url, data)

			return items.set(item.id, item)
		}

		async function remove(id: number) {
			const { data: item } = await api.delete(`/${namespace}/${id}`)
			return items.set(item.id, item)
		}

		return {
			items,
			list,
			fetch,
			create,
			update,
			remove,
		}
	})
}
