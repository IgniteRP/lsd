import { reactive, type InjectionKey, type Ref, provide, inject } from 'vue'
import { defineStore } from '../includes/functions'

interface ReportData {
	id: number
	title: string
	description: string
	created: string
}

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

function loadState(): Map<number, ReportData> {
	const saved = localStorage.getItem('reports')
	if (!saved) return new Map()

	return new Map(JSON.parse(saved))
}

function saveState(items: Map<number, ReportData>) {
	localStorage.setItem('reports', JSON.stringify(Array.from(items)))
}

export const useReports = defineStore('reports', () => {
	const items = reactive(loadState())

	function create(data: Omit<ReportData, 'id'>): ReportData {
		const id = items.size + 1
		const item = { ...data, id, created: new Date().toISOString() }

		items.set(id, item)
		saveState(items)
		return items.get(id)!
	}

	function remove(id: number) {
		items.delete(id)
		saveState(items)
	}

	return {
		items,
		create,
		remove,
	}
})
