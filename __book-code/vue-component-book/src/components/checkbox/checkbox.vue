<template>
    <label>
        <span>

            <input
                    v-if="group"
                    type="checkbox"
                    :disabled="disabled"
                    :value="label"
                    v-model="model"
                    @change="change">

            <input
                    v-else
                    type="checkbox"
                    :disabled="disabled"
                    :checked="currentValue"
                    @change="change">

        </span>

        <slot></slot>
    </label>
</template>
<script>
    import {findComponentUpward} from '../../utils/assist.js';
    import Emitter from '../../mixins/emitter.js';

    export default {
        name: 'iCheckbox',
        mixins: [Emitter],
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            // 值
            label: {
                type: [String, Number, Boolean]
            },
            value: {
                type: [String, Number, Boolean],
                default: false
            },

            // 赋值的范围 -> 用于类型判断
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
        },
        data() {
            return {
                // 当前值 表单单独
                currentValue: this.value,
                model: [],
                // 是否有父元素
                group: false,
                parent: null,
            };
        },
        mounted() {
            this.parent = findComponentUpward(this, 'iCheckboxGroup');

            if (this.parent) {
                this.group = true;
            }

            if (this.group) {
                this.parent.updateModel(true);
            } else {
                this.updateModel();
            }
        },
        methods: {
            change(event) {
                if (this.disabled) {
                    return false;
                }

                const checked = event.target.checked;
                this.currentValue = checked;

                const value = checked ? this.trueValue : this.falseValue;
                this.$emit('input', value);

                if (this.group) {
                    this.parent.change(this.model);
                } else {
                    this.$emit('on-change', value);
                    this.dispatch('iFormItem', 'on-form-change', value);
                }
            },
            updateModel() {
                this.currentValue = this.value === this.trueValue;
            },
        },
        watch: {
            // 监听checkbox的值
            value(val) {
                if (val === this.trueValue || val === this.falseValue) {
                    this.updateModel();
                } else {
                    throw 'Value should be trueValue or falseValue.';
                }
            }
        }
    };
</script>
