import * as React from "react";

import {useEffect, useRef} from "react";
import {values} from "./values";
import useWindowDimensions from "./windowSize";

export default function Scroller({setSection, ...props}){
    const scroller = useRef(null);

    return (
        <div ref={scroller}>
            {React.Children.map(props.children, (child, index) =>
                <RenderChild
                    child={child}
                    index={index}
                    setSection={setSection}
                    scroller={scroller}
                />
            )}
        </div>
    );
}

function RenderChild({child, index, setSection}) {
    const {width, height} = useWindowDimensions();
    const sectionRef = useRef();

    const handleScroll = () => {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < height/2) setSection(index);
    };

    useEffect(() => {
        if (values.sections[index].short) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div ref={sectionRef} key={index} onScroll={handleScroll}>
            {child}
        </div>
    );
}