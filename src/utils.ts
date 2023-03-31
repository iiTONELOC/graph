export type randomWeightOptions = {
    max?: number;
    min?: number;
    forceInteger?: boolean;
    roundTo?: number;
    allowNegative?: boolean;
    allowZero?: boolean;
};

function flipCoin(): boolean {
    return Math.random() > 0.5;
}

function randomNumber(options?: randomWeightOptions): number { // NOSONAR
    const { max, min, allowNegative, allowZero } = options || {};

    let _randomNumber: number = Math.random();
    _randomNumber *= (max || 100);

    if (allowNegative) {

        if (_randomNumber > 0) {
            const shouldMakeNegative: boolean = flipCoin();
            _randomNumber = shouldMakeNegative ? _randomNumber * - 1 : _randomNumber;
        }
    } else {
        _randomNumber = Math.abs(_randomNumber);
    }

    if (!allowZero) {
        while (_randomNumber === 0) {
            _randomNumber = randomNumber({ max, min, allowNegative, allowZero });
        }
    } else {
        // if the number isn't a negative number,  toss a coin to see if it should be zero
        if (_randomNumber > 0) {
            const shouldMakeZero: boolean = flipCoin();
            _randomNumber = shouldMakeZero ? 0 : _randomNumber;
        }
    }

    while (min !== undefined && _randomNumber < min) {
        _randomNumber = randomNumber({ max, min, allowNegative, allowZero });
    }

    while (max !== undefined && _randomNumber > max) {
        _randomNumber = randomNumber({ max, min, allowNegative, allowZero });
    }


    return _randomNumber;
}

export function randomWeight(options?: randomWeightOptions): number {
    const { max, min, allowNegative, allowZero, forceInteger, roundTo } = options || {};

    // create the random number generator
    let _randomWeight = randomNumber({ max, min, allowNegative, allowZero });


    const finalizeWeight = (weight: number): number => {
        // enforce the integer or round properties dont use ternary operator

        if (roundTo) {
            // round the weight
            _randomWeight = Math.round(weight / roundTo) * roundTo;
        }

        if (forceInteger) {
            // round the weight
            _randomWeight = Math.floor(weight);
        }

        return _randomWeight;
    };


    // finalize the weight
    return finalizeWeight(_randomWeight);
}
