const rewire = require("rewire")
const Posts = rewire("./Posts")
const mapStateToProps = Posts.__get__("mapStateToProps")
const mapDispatchToProps = Posts.__get__("mapDispatchToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ postReducer: { posts: [-1.0, -1.0, -1.0] }, filterReducer: { filter: true } }, { sortField: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", sortOrder: "pending" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ postReducer: { posts: [-29.45, 10.23, 10.23] }, filterReducer: { filter: true } }, { sortField: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", sortOrder: "draft" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStateToProps({ postReducer: { posts: [-29.45, 0.0, 10.0] }, filterReducer: { filter: false } }, { sortField: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", sortOrder: "canceled" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStateToProps({ postReducer: { posts: [10.0, -1.0, 10.23] }, filterReducer: { filter: true } }, { sortField: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", sortOrder: "completed" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStateToProps({ postReducer: { posts: [-1.0, 10.23, 1.0] }, filterReducer: { filter: true } }, { sortField: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", sortOrder: "completed" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("mapDispatchToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapDispatchToProps(() => false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapDispatchToProps(() => true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapDispatchToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
