import type { ReportData } from 'server'
import { defineStore } from 'client/includes/functions'

export interface ReferenceData {
	reports: ReportData[]
}

export const useReferences = defineStore('references', ({ api }) => {
	function list(type: string, id: number) {
		return api
			.get<ReferenceData>(`/references/${type}/${id}`)
			.then(res => res.data)
	}

	return {
		list,
	}
})
