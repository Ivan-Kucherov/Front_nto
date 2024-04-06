<script>

export default {
    data() {
        return {
        }
    },
    methods: {
        RouteTo(name){
            this.$router.replace(name)
        }
    },

}
</script>

<template>
    <CNav variant="underline-border">
        <CNavItem>
            <CNavLink  style="font-weight: bold;color:darkmagenta;font-size: large;" href="#" @click="RouteTo('/')">DeepDiving</CNavLink>
        </CNavItem>
        <CNavItem>
            <CNavLink href="#" @click="RouteTo('/preds')">Поиск интересных мест</CNavLink>
        </CNavItem>
        <CNavItem  style="margin-left: auto;">
            <CNavLink href="#" @click="RouteTo('/about')">О нашей команде</CNavLink>
        </CNavItem>
    </CNav>
</template>

<style scoped>
.active {
    font-weight: bold;
}
</style>
