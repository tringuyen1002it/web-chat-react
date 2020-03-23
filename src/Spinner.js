import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Spinner = () => (
    <Dimmer active>
        <Loader size="large" content="Prepare chat ...." />
    </Dimmer>
)

export default Spinner