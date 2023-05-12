import { reactive, type InjectionKey, type Ref, provide, inject } from 'vue'
import { defineStore } from '../includes/functions'
import type { ReportData } from 'server'
import { StoreMap } from 'client/includes/StoreMap'

export type ReportRef = Ref<ReportData | null>

export const ReportInjectionKey: InjectionKey<ReportRef> = Symbol('Report')

export function provideReport(report: ReportRef) {
	provide(ReportInjectionKey, report)
}

export function injectReport(): ReportRef {
	const report = inject(ReportInjectionKey)
	if (!report) throw new Error('No report provided')

	return report
}

export const useReports = defineStore('reports', ({ api }) => {
	const items = reactive(new StoreMap<number, ReportData>())

	async function list(params?: Record<string, any>) {
		const { data } = await api.get<ReportData[]>('/reports', { params })
		return data.map(item => items.set(item.id, item))
	}

	async function fetch(id: number) {
		const { data: item } = await api.get<ReportData>(`/reports/${id}`)
		return items.set(item.id, item)
	}

	async function create(
		data: Omit<ReportData, 'id' | 'created'>,
	): Promise<ReportData> {
		const { data: item } = await api.post<ReportData>('/reports', data)
		return items.set(item.id, item)
	}

	async function update(data: Partial<ReportData>) {
		const url = `/reports/${data.id}`
		const { data: item } = await api.patch<ReportData>(url, data)

		return items.set(item.id, item)
	}

	async function remove(id: number) {
		const { data: item } = await api.delete(`/reports/${id}`)
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
