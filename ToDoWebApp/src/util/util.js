export default {

    loadSettings () {
        throw new Error(`Error accessing database`);
    },
    add : function(a,b) {
        const settings = this.loadSettings();
        return a + b;
    },
    sub (a,b) {
        return a - b;
    }
}
