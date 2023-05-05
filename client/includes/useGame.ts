import { onMounted, onUnmounted } from 'vue'

export interface GameEvent {
	action: string
	data?: any
}

export function useGame() {
	const listeners = new Map<string, Set<Function>>()

	function handleMessage({ data: event }: MessageEvent<GameEvent>) {
		if (!event.action || !listeners.has(event.action)) return

		const handlers = listeners.get(event.action)!
		for (const handler of handlers) handler(event.data)
	}

	onMounted(() => window.addEventListener('message', handleMessage))
	onUnmounted(() => window.removeEventListener('message', handleMessage))

	return {
		on<T = any>(action: string, callback: (data: T) => any) {
			if (!listeners.has(action)) listeners.set(action, new Set())
			const handlers = listeners.get(action)!

			handlers.add(callback)
			return () => handlers.delete(callback)
		},
		emit(action: string, data?: any) {
			return window.dispatchEvent(
				new CustomEvent<GameEvent>('emit', {
					detail: { action, data },
				}),
			)
		},
	}
}
