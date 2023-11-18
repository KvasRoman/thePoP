type Position = {
    x: number,
    y: number,
}
export type AnimationAnchors = {
    task: {
        left_side: Position,
        right_side: Position,
        center: Position,
        bellow: Position
    }
    add_panel: {
        top_left: Position,
        bottom_left: Position
    }
}

export const IOS_ANCHORS: AnimationAnchors = {
    task: {
        left_side: { x: 35, y: 110 },
        right_side: { x: 75, y: 110 },
        center: { x: 55, y: 110 },
        bellow: {x: 55, y: 90}
    },
    add_panel: {
        top_left: { x: 50, y: 35 },
        bottom_left: { x: 50, y: 15 }
    }
}
export const ANDROID_ANCHORS: AnimationAnchors = {
    task: {
        left_side: { x: 35, y: 105 },
        right_side: { x: 75, y: 105 },
        center: { x: 55, y: 105 },
        bellow: {x: 55, y: 90}
    },
    add_panel: {
        top_left: { x: 50, y: 35 },
        bottom_left: { x: 50, y: 15 }
    }
}


