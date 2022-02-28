---
name: Bug Report
about: Use this template to report bugs.
title: "[VERSION]: [SHORT DESCRIPTION]"
labels: bug
---

<!-- Please fill out the form below -->

| Name         | Description                                                                | 
| ------------ | -------------------------------------------------------------------------- |
| Version      | <!-- PLEASE_FILL_IN_THE_VERSION_HERE -->                                   |
| Since        | <!-- PLEASE_FILL_IN_WHEN_YOU_EXPERIENCED_THE_BUG_FIRST -->                 |
| OS           | <!-- WHICH OPERATING SYSTEM DO YOU USE? -->                                |
| NODE VERSION | <!-- WHICH NODE VERSION DO YOU USE? -->                                    |



**Severity**

<!-- PLEASE [x] CHECK THE BOX BELOW IF THE STATEMENT IS CORRECT -->

- [ ] Security defect <!-- Please visit the "Security policy" instead on how to disclose security defects  -->
- [ ] Functional errors <!-- the software is incompatible with other software -->
- [ ] Performance defects <!-- the software performs bad -->
- [ ] Usability defects <!-- the software is hard to use -->
- [ ] Compatibility defects <!-- the software is incompatible with other software -->



**Description**

<!-- PLEASE DESCRIBE THE BUG -->



**Reproduce**

<!-- WHAT STEPS ARE NEEDED TO REPRODUCE THE BUG? FEEL FREE TO DELETE THE EXAMPLE BELOW-->
<!-- CAN YOU PROVIDE AN MINIMAL REPOSITORY WHERE THE BUG CAN BE REPRODUCED -->

1. Create a new folder and run `npm init --yes` and `npm install @pascalsalesch/hetzner-cloud-api`
2. Create a index.js with the following content

```js
import hetzner from '@pascalsalesch/hetzner-cloud-api'

// ADD YOUR CODE SNIPPET HERE
```

3. Run the code

Expected: <!-- WHAT DID YOU EXPECT TO HAPPEN? -->
Instead: <!-- WHAT HAPPENED INSTEAD? -->
