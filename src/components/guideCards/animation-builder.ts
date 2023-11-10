import Animated, { AnimatableValue, Easing, Keyframe, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
export class AnimationBuilder<Type extends AnimatableValue>{

    private states: { value: Type, progress: number }[]
    private duration: number
    private delay: number
    constructor() {
        this.states = [];
        this.duration = 1000;
        this.delay = 0;
    }
    setDelay(miliseconds: number) {
        if (miliseconds <= 0) {
            throw new Error('delay should be greater than 0')
        }
        this.delay = miliseconds * 1000;
        return this;
    }
    setDuration(miliseconds: number) {
        if (miliseconds <= 100) {
            throw new Error('duraction should be greater than 100')
        }
        this.duration = miliseconds
        return this;
    }
    addKeyFrame(state: Type, progreses: number) {
        this.states.push({ value: state, progress: progreses });
        return this;
    }
    build() {
        this.states = this.states.sort((a, b) => a.progress < b.progress ? -1 : 1);
        let lastProgressValue: number = 0
        const transitions: AnimatableValue[] = [];
        const firstTransition: AnimatableValue = this.delay === 0 ? withTiming<Type>(this.states[0].value, {
            duration: this.duration / (this.states[0].progress - lastProgressValue)
        }) : withDelay<Type>(this.delay, withTiming<Type>(this.states[0].value, {
            duration: this.duration / (this.states[0].progress - lastProgressValue)
        }))
        this.states.shift();
        for (let state of this.states) {
            transitions.push(withTiming<Type>(state.value, {
                duration: this.duration / (state.progress - lastProgressValue)
            }))
        }
        return withSequence(firstTransition, ...transitions);
    }
}