<template>
    <div class="nearby">
        <ul>
            <li>综合排序<var-icon name="chevron-down" /></li>
            <li>销量最高</li>
            <li>距离最近</li>
            <li>筛选<var-icon name="chevron-down" /></li>
        </ul>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.nearby {
    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
