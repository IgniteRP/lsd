import { assign } from '@michealpearce/utils'

export class StoreMap<Key, Item extends object> {
	[Symbol.iterator]() {
		return this.map.entries()
	}

	protected readonly map: Map<Key, Item>

	constructor(initData?: [Key, Item][]) {
		this.map = new Map(initData)
	}

	has(key: Key) {
		return this.map.has(key)
	}

	get(key: Key) {
		return this.map.get(key)
	}

	set(key: Key, item: Item) {
		if (this.map.has(key)) {
			// update existing reactive object
			const existing = this.map.get(key)!
			assign(existing, item)
		} else this.map.set(key, item)

		return this.get(key)!
	}
}
