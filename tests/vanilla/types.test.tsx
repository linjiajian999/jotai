import { expectType } from 'ts-expect'
import { atom } from 'jotai/vanilla'
import type { Atom, PrimitiveAtom, WritableAtom } from 'jotai/vanilla'

it('atom() should return the correct types', () => {
  function Component() {
    // primitive atom
    const primitiveAtom = atom(0)
    expectType<PrimitiveAtom<number>>(primitiveAtom)

    // read-only derived atom
    const readonlyDerivedAtom = atom((get) => get(primitiveAtom) * 2)
    expectType<Atom<number>>(readonlyDerivedAtom)

    // read-write derived atom
    const readWriteDerivedAtom = atom(
      (get) => get(primitiveAtom),
      (get, set, value: number) => {
        set(primitiveAtom, get(primitiveAtom) + value)
      }
    )
    expectType<WritableAtom<number, [number], void>>(readWriteDerivedAtom)

    // write-only derived atom
    const writeonlyDerivedAtom = atom(null, (get, set) => {
      set(primitiveAtom, get(primitiveAtom) - 1)
    })
    expectType<WritableAtom<null, [], void>>(writeonlyDerivedAtom)
  }
  Component
})