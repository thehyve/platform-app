export const targetSectionsDefaultOrder = [
  // 'drugs',
  // 'tractability',
  // 'safety',
  'chemicalProbes',
  // 'bibliography',
  // 'variation',
  // 'expression',
  // 'protein',
  // 'homology',
  // 'geneOntology',
  // 'proteinInteractions',
  // 'pathways',
  'relatedTargets',
  // 'mousePhenotypes',
  // 'cancerHallmarks',
  'cancerBiomarkers',
];

export const diseaseSectionsDefaultOrder = [
  // 'ontology',
  'knownDrugs',
  'bibliography',
  // 'phenotypes',
  'relatedDiseases',
];

export const drugSectionsDefaultOrder = [
  'mechanismsOfAction',
  'adverseEvents',
  'bibliography',
  'indications',
];

export const evidenceSectionsDefaultOrder = [
  'gwasCatalog',
  'phewasCatalog',
  'eva',
  'uniProt',
  'uniProtLiterature',
  'gene2Phenotype',
  'genomicsEngland',
  'intogen',
  'cancerGeneCensus',
  'evaSomatic',
  'uniProtSomatic',
  'reactome',
  'progeny',
  'slapenrich',
  'crispr',
  'sysBio',
  'drugs',
  'differentialExpression',
  'textMining',
  'animalModels',
];

export const evidenceByDatatypeSectionsDefaultOrder = [
  'genetic',
  'somatic',
  'drugs',
  'pathways',
  'differentialExpression',
  'textMining',
  'animalModels',
];

// Known drugs widget links on the 'source' column.
export const clinicalTrialsSearchUrl = 'https://clinicaltrials.gov/ct2/results';

// useBatchDownloader hook.
export const chunkSize = 100;
