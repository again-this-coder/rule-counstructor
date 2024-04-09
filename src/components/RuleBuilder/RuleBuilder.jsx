import React, { useState } from "react";
import FilterSelector from "../FilterSelector/FilterSelector";
import "./RuleBuilder.css";

const RuleBuilder = () => {
  const [groups, setGroups] = useState([
    {
      rules: [
        {
          field: "",
          condition: "equals",
          value: "",
          logicalOperator: undefined,
        },
      ],
    },
  ]);
  const [filters, setFilters] = useState(["age", "payer"]);
  const [newFilter, setNewFilter] = useState("");
  const [generatedJSON, setGeneratedJSON] = useState("");

  const handleFieldChange = (event, index, groupIndex) => {
    const updatedRules = [...groups];
    updatedRules[index].rules[groupIndex].field = event.target.value;
    setGroups(updatedRules);
  };

  const handleConditionChange = (event, index, groupIndex) => {
    const updatedRules = [...groups];
    updatedRules[index].rules[groupIndex].condition = event.target.value;
    setGroups(updatedRules);
  };

  const handleValueChange = (event, index, groupIndex) => {
    const updatedRules = [...groups];
    updatedRules[index].rules[groupIndex].value = event.target.value;
    setGroups(updatedRules);
  };

  const handleRuleLogicalOperatorChange = (event, groupIndex, ruleIndex) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].rules[ruleIndex].logicalOperator =
      event.target.value;
    setGroups(updatedGroups);
  };

  const handleLogicalOperatorChange = (event, index) => {
    const updatedRules = [...groups];
    updatedRules[index].logicalOperator = event.target.value;
    setGroups(updatedRules);
  };

  const addRule = (index) => {
    const updatedGroups = [...groups];
    updatedGroups[index].rules.push({
      field: "",
      condition: "equals",
      value: "",
      logicalOperator: "AND",
    });
    setGroups(updatedGroups);
  };

  const addGroup = () => {
    const updatedGroups = [...groups];
    updatedGroups.push({
      logicalOperator: "AND",
      rules: [
        {
          field: "",
          condition: "equals",
          value: "",
          logicalOperator: undefined,
        },
      ],
    });
    setGroups(updatedGroups);
  };

  const removeRule = (groupIndex, ruleIndex) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].rules.splice(ruleIndex, 1);
    setGroups(updatedGroups);
  };

  const removeGroup = (groupIndex) => {
    const updatedGroups = [...groups];
    updatedGroups.splice(groupIndex, 1);
    setGroups(updatedGroups);
  };

  const generateJSON = () => {
    const jsonRules = groups.map((group, index) => {
      const rules = group.rules.map((rule, ruleIndex) => ({
        field: rule.field,
        condition: rule.condition,
        value: rule.value,
        logicalOperator: ruleIndex > 0 ? rule.logicalOperator : undefined,
      }));
      return {
        logicalOperator: index > 0 ? group.logicalOperator || "AND" : undefined,
        rules,
      };
    });

    setGeneratedJSON(JSON.stringify(jsonRules, null, 2));
  };

  const handleNewFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addNewFilter = () => {
    if (newFilter.trim() !== "") {
      setFilters([...filters, newFilter.trim()]);
      setNewFilter("");
    }
  };

  return (
    <div className="rule-builder-container">
      <h2 className="rule-builder-title">Rule Builder</h2>
      <div>
        <input
          type="text"
          placeholder="Enter new filter"
          value={newFilter}
          onChange={handleNewFilterChange}
          className="new-filter-input"
        />
        <button className="add-group" onClick={addNewFilter}>
          Add Filter
        </button>
      </div>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="rule-builder-rule">
          {groupIndex > 0 && (
            <div>
              <h4>Logical operator between groups</h4>
              <select
                className="margin-bottom"
                value={group.logicalOperator}
                onChange={(e) => handleLogicalOperatorChange(e, groupIndex)}
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </div>
          )}
          {group.rules.map((rule, ruleIndex) => (
            <div key={ruleIndex}>
              {ruleIndex > 0 && (
                <select
                  className="logical-operator"
                  value={rule.logicalOperator}
                  onChange={(e) =>
                    handleRuleLogicalOperatorChange(e, groupIndex, ruleIndex)
                  }
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                </select>
              )}
              <FilterSelector
                filters={filters}
                selectedFilter={rule.field}
                onChange={(e) => handleFieldChange(e, groupIndex, ruleIndex)}
              />
              <select
                value={rule.condition}
                onChange={(e) =>
                  handleConditionChange(e, groupIndex, ruleIndex)
                }
                className="additional-padding"
              >
                <option value="equals">equals</option>
                <option value="greaterThan">greater than</option>
              </select>
              <input
                type="text"
                value={rule.value}
                onChange={(e) => handleValueChange(e, groupIndex, ruleIndex)}
              />
              <button
                className="remove-rule margin-bottom"
                onClick={() => removeRule(groupIndex, ruleIndex)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="add-buttons-container">
            <button className="add-rule" onClick={() => addRule(groupIndex)}>
              Add Rule
            </button>
            {groups.length > 1 && (
              <button
                className="remove-group"
                onClick={() => removeGroup(groupIndex)}
              >
                Remove Group {groupIndex + 1}
              </button>
            )}
          </div>
        </div>
      ))}
      <button className="add-group" onClick={addGroup}>
        Add Group
      </button>
      <div className="rule-builder-section">
        <button className="generate-json bg-green" onClick={generateJSON}>
          Generate JSON
        </button>
      </div>
      <div className="rule-builder-json">
        <textarea value={generatedJSON} readOnly />
      </div>
    </div>
  );
};

export default RuleBuilder;
