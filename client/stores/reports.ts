import { type InjectionKey, type Ref, provide, inject } from 'vue'
import type { ReportData } from 'server'
import { defineItemStore } from 'client/includes/defineItemStore'

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

export const useReports = defineItemStore<ReportData>('reports')
