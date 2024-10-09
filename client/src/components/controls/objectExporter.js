// src/components/ObjectExporter.js
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';

const exportObject = (scene) => {
    const exporter = new STLExporter();
    const objectToExport = scene.getObjectByName('initialCube');

    if (!objectToExport) {
        console.error('Object not found in the scene.');
        return;
    }

    const stlString = exporter.parse(objectToExport);
    const blob = new Blob([stlString], { type: 'application/sla' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    // link.download = 'model.stl';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
};

export default exportObject;
