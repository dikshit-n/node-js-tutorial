# Modelling relationship 

## Difference
### Trade off between query performance vs consistency


## Classifications
### Using References (Normalization) -> CONSISTENCY
```
let author = {
    name: 'Dikshit'
};

let course = {
    author: 'id'
};
```

### Using embedded Documents (Denormalization) -> PERFORMANCE
```
let course = {
    author: {
        name: 'Dikshit'
    }
};
```

### Hybrid
```
let author = {
    name: 'Dikshit'
    // 50 other properties
};

let course = {
    author: {
        id: 'ref',
        name: 'Dikshit'
    }
};
```
