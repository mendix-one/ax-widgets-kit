import { makeAutoObservable } from 'mobx'

export class SliderStore {
  value = 0
  label = ''
  min = 0
  max = 100
  step = 1
  disabled = false
  color: 'primary' | 'secondary' = 'primary'
  size: 'small' | 'medium' = 'medium'
  marks = false
  valueLabelDisplay: 'auto' | 'on' | 'off' = 'auto'

  // Callbacks set by container
  onValueChange?: (v: number) => void
  onChangeAction?: () => void

  validation: string | undefined = undefined
  loading = false
  constructor() {
    makeAutoObservable(this)
  }

  setValue(v: number) {
    this.value = v
    this.onValueChange?.(v)
    this.onChangeAction?.()
  }

  // Sync from Mendix (don't trigger onChange callback)
  syncValue(v: number) {
    this.value = v
  }

  setLabel(v: string) {
    this.label = v
  }

  setMin(v: number) {
    this.min = v
  }

  setMax(v: number) {
    this.max = v
  }

  setStep(v: number) {
    this.step = v
  }

  setDisabled(v: boolean) {
    this.disabled = v
  }

  setColor(v: 'primary' | 'secondary') {
    this.color = v
  }

  setSize(v: 'small' | 'medium') {
    this.size = v
  }

  setMarks(v: boolean) {
    this.marks = v
  }

  setValueLabelDisplay(v: 'auto' | 'on' | 'off') {
    this.valueLabelDisplay = v
  }

  setValidation(v: string | undefined) {
    this.validation = v
  }

  setLoading(v: boolean) {
    this.loading = v
  }
}
