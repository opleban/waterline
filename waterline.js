class IslandChainModel {
  constructor({ height = 10, width = 5, waterLine = 100, 
                elevationMin = 50, elevationMax = 200 } = {}) {
    this.height = +height;
    this.width = +width;
    this.waterLine = +waterLine;
    this.elevationMin = +elevationMin;
    this.elevationMax = +elevationMax;
    this.islands = this.generateIslands();
  }

  generateIslands() {
    const numberOfIslands = this.getNumberOfIslands();
    const islandElevations = [];
    for (let i = 0; i < numberOfIslands; i++) {
        islandElevations.push(this.generateIslandElevation())
    }
    return islandElevations;
  }

  generateIslandElevation() {
    return Math.floor(Math.random() * (this.elevationMax - this.elevationMin)) + this.elevationMin;
  }

  getNumberOfIslands() {
    return this.height * this.width;
  }

  getSubmergedIslands() {
    return this.islands.filter(this.isIslandSubmerged, this)
  }

  isIslandSubmerged(islandElevation) {
    return islandElevation < this.waterLine;
  }

  updateWaterLine(value) {
    this.waterLine = value;
  }

  regenerate({ height = 10, width = 5, waterLine = 100, 
                elevationMin = 50, elevationMax = 200 } = {}) {
    this.height = +height;
    this.width = +width;
    this.waterLine = +waterLine;
    this.elevationMin = +elevationMin;
    this.elevationMax = +elevationMax;
    this.islands = this.generateIslands();
  }

}

class IslandChainViewer {
  constructor(islandChainModel, containerId) {
    this.islandChainModel = islandChainModel;
    this.containerElement = document.getElementById(containerId);
  }

  isEndOfRow(width, currentIdx) {
    return (currentIdx + 1) % width == 0;
  }

  createIslandFragment(islandElevation) {
    const islandFragment = document.createElement('li');
    islandFragment.classList.add('island');
    const aboveOrBelowWaterClass = 
      this.islandChainModel.isIslandSubmerged(islandElevation) ? 
        'underwater' : 
        'above-water';

    islandFragment.classList.add(aboveOrBelowWaterClass);
    islandFragment.textContent = islandElevation;
    return islandFragment;
  }

  createIslandChain() {
    const islandChain = document.createElement('ul');
    islandChain.setAttribute('id', 'island-chain-list');
    this.islandChainModel.islands.forEach((island, idx) => {
      islandChain.appendChild(this.createIslandFragment(island));
      
      if (this.isEndOfRow(this.islandChainModel.width, idx)) {
        islandChain.appendChild(document.createElement('br'));
      }
    })
    return islandChain;
  }

  destroy() {
    document.getElementById('island-chain-list').remove();
  }

  update() {
    console.log('UPDATE:', this.islandChainModel);
    this.destroy();
    this.render();
  }

  render() {
    const islandChainFragment = this.createIslandChain()
    this.containerElement.appendChild(islandChainFragment);
  }

}