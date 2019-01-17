function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            // 命中
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // 没命中 -> 递归
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}

export default {
    methods: {
        // 向上级派发事件
        dispatch(componentName, eventName, params) {
            // 不存在parent -> 直接通知$root
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            // 终止条件
            // 1. 没有parent
            // 2. name存在并符合
            while (parent && (!name || name !== componentName)) {

                parent = parent.$parent;
                if (parent) { name = parent.$options.name; }
            }

            if (parent) {
                // 触发事件
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        // 由上级向下级广播事件
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};
