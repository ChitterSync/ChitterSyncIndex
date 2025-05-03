const { useRef, useState, useEffect, createRef } = React


/*--------------------
Items
--------------------*/
const items = [
  {
    name: "Hot",
    color: "#f44336",
    href: "home/discover/hot"
  },
  {
    name: "New",
    color: "#e91e63",
    href: "#"
  },
  {
    name: "Stores",
    color: "#9c27b0",
    href: "#"
  },
  {
    name: "Discover",
    color: "#673ab7",
    href: "search"
  },
  {
    name: "Develop",
    color: "#3f51b5",
    href: "home/create/index.html"
  }
];


/*--------------------
Menu
--------------------*/
const Menu = ({items}) => {
  const $root = useRef()
  const $indicator1 = useRef()
  const $indicator2 = useRef()
  const $items = useRef(items.map(createRef))
  const [ active, setActive ] = useState(0)
  
  const animate = () => {
    const menuOffset = $root.current.getBoundingClientRect()
    const activeItem = $items.current[active].current
    const { width, height, top, left } = activeItem.getBoundingClientRect()
    
    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: items[active].color,
      ease: 'elastic.out(.7, .7)',
      duration: .8
    }
    
    gsap.to($indicator1.current, {
      ...settings,
    })
    
    gsap.to($indicator2.current, {
      ...settings,
      duration: 1
    })
  }
  
  useEffect(() => {
    animate()
    window.addEventListener('resize', animate)
    
    return (() => {
      window.removeEventListener('resize', animate)
    })    
  }, [active])
  
  return (
    <div
      ref={$root}
      className="menu"
    >
      {items.map((item, index) => (
        <a
          key={item.name}
          ref={$items.current[index]}
          className={`item ${active === index ? 'active' : ''}`}
          onMouseEnter={() => {
            setActive(index)
          }}
          href={item.href}
         >
          {item.name}
        </a>
      ))}
      <div
        ref={$indicator1}
        className="indicator"
       />
      <div
        ref={$indicator2}
        className="indicator"
       />
    </div>
  )
}


/*--------------------
App
--------------------*/
const App = () => {
  return (
    <div className="App">
      <Menu items={items} />
    </div>
  )
}


/*--------------------
Render
--------------------*/
ReactDOM.render(<App />,
document.getElementById("root"))